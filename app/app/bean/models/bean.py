from uuid import uuid4
from typing import Iterable
from enum import Enum
from django.db import models
from pycountry import countries
from app.shared.mixins import TimeStampMixin


class Bean(TimeStampMixin):
    """
    Represents the concept of a bean type.
    Where did it come from?
    What did it cost?
    Country of origin, anything people who roast care about more or less...
    """

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    class ProcessingMethods(Enum):
        """
        Different ways to process a bean.
        """

        WASHED = "washed"
        NATURAL = "natural"
        HONEY = "honey"

    class SCAGScore(Enum):
        """
        Not sure on the right terminology here but
        the G scale is common from third party sourcing.
        """

        SPECIALTY_GRADE = "G1"
        PREMIUM_GRADE = "G2"
        COMMERCIAL_GRADE = "G3"

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(
        max_length=255,
        help_text="The name of the origin of the bean.",
    )
    country = models.CharField(
        max_length=255,
        choices=[(country.name, country.name) for country in countries],
        help_text="The country of origin of the bean",
    )
    # G1 (specialty is >= 80 points)
    # G2 (Premium is 70-79.75)
    sca_grade = models.IntegerField(
        help_text="Uses the Specialty Coffee Association grade system to score the quality",
        null=True,
        blank=True,
    )
    sca_letter_grade = models.CharField(max_length=255, choices=[])
    processing = models.CharField(
        max_length=255,
        choices=[
            (
                processing_method.name,
                processing_method.value,
            )
            for processing_method in ProcessingMethods
        ],
    )

    class Meta:
        db_table = "beans"

    def save(
        self,
        force_insert: bool = False,
        force_update: bool = False,
        using: str = None,
        update_fields: Iterable[str] = [],
    ):
        # Just provide a little extra context, the user shouldn't have to worry too much about knowing both the number grade and the G grade
        # TODO maybe allow either / or to be filled out, but, I think this is less complex?
        if self.sca_grade:
            if self.sca_grade >= 79.75:
                self.sca_letter_grade = self.SCAGScore.SPECIALTY_GRADE.value
            elif self.sca_grade >= 70 and self.sca_grade > 79.75:
                self.sca_letter_grade = self.SCAGScore.PREMIUM_GRADE.value
            else:
                self.sca_letter_grade = self.SCAGScore.COMMERCIAL_GRADE
        return super().save(force_insert, force_update, using, update_fields)
