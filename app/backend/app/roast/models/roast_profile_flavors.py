from enum import Enum
from django.db import models
from uuid import uuid4
from rest_framework.exceptions import ValidationError
from app.shared.mixins import TimeStampMixin


class RoastProfileFlavors(TimeStampMixin):
    """
    Provides a set of customizable.

    TODO another way to handle this is to make this table independent, and, to then
         add this data to a json field on the roastProfile itself so it keeps this data independent...

    TODO these should be INDIVIDUALLY.
    """

    class Suggestions(Enum):
        """
        To be provided to the user when
        they're starting to add flavor profiles.

        Why not right?

        TODO if you think of any other nice / useful suggestions
             just add them in here as time goes on.
        """

        SPICY = "spicy"
        CHOCOLATEY = "chocolatey"
        NUTTY = "nutty"
        BUTTERY = "buttery"
        FRUITY = "fruity"
        FLOWERY = "flowery"
        WINEY = "winey"
        EARTHY = "earthy"

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    roast_profile = models.ManyToManyField(
        "roast.RoastProfile",
        related_name="roast_profile_flavors",
        db_table="roast_profile_to_flavors",
    )
    roast_flavor = models.ForeignKey(
        "roast.RoastFlavors", on_delete=models.CASCADE, related_name="roast_flavors"
    )
    scale = models.PositiveSmallIntegerField(
        default=50,
        help_text="Provides a scale from 1-100 of how much of a certain flavor is detected in a roast profile.",
    )

    def save(self, *args, **kwargs) -> None:
        if self.scale < 0:
            raise ValidationError({"scale": ["Cannot be lower than 0"]})
        if self.scale > 100:
            raise ValidationError({"scale": ["Cannot be greater than 100"]})
        return super().save(*args, **kwargs)

    @classmethod
    def get_suggestions(cls) -> list[str]:
        return [suggestion.value for suggestion in cls.Suggestions]

    class Meta:
        db_table = "roast_profile_flavors"
