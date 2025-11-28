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

    TODO I do think separating country / region / municipality into its own model is likely a good idea
    TODO maybe have a database of country / region / municipality to do validation against
    """

    class ProcessingMethods(Enum):
        """
        Different ways to process a bean.
        """

        WASHED = "washed"
        NATURAL = "natural"
        HONEY = "honey"

    class SCALetterGrade(Enum):
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
        null=True,
        blank=True,
    )
    sca_grade = models.IntegerField(
        help_text="Uses the Specialty Coffee Association grade system to score the quality",
        null=True,
        blank=True,
    )
    sca_letter_grade = models.CharField(
        max_length=255,
        choices=[(grade.name, grade.value) for grade in SCALetterGrade],
        null=True,
        blank=True,
    )
    processing = models.CharField(
        max_length=255,
        choices=[
            (
                processing_method.name,
                processing_method.value,
            )
            for processing_method in ProcessingMethods
        ],
        null=True,
        blank=True,
    )
    origin = models.OneToOneField(
        "origin.Origin",
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING,
    )

    # TODO probably want to setup a unique constraint
    # name / grade / processing method / origin constraint would be the "same bean" basically.
    class Meta:
        db_table = "beans"

    def save(
        self,
        force_insert: bool = False,
        force_update: bool = False,
        using: str = None,
        update_fields: Iterable[str] = None,
    ) -> None:
        """
        Just provide a little extra context, the user shouldn't have to worry
        too much about knowing both the number grade and the G grade.

        TODO maybe allow either / or to be filled out, but, I think this is less complex?
        TODO maybe just handle the validation in the serializers
        """
        if self.sca_grade:
            if self.sca_grade >= 80:
                self.sca_letter_grade = self.SCALetterGrade.SPECIALTY_GRADE.value
            elif self.sca_grade >= 70 and self.sca_grade < 80:
                self.sca_letter_grade = self.SCALetterGrade.PREMIUM_GRADE.value
            else:
                self.sca_letter_grade = self.SCALetterGrade.COMMERCIAL_GRADE
        return super().save(force_insert, force_update, using, update_fields)
