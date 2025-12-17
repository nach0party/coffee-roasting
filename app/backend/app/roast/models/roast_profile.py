from uuid import uuid4
from enum import Enum
from app.shared.mixins import TimeStampMixin
from django.db import models


class RoastProfile(TimeStampMixin):
    """
    Data to essentialy be aggregated to provide
    information about the success of a roast.

    One roast to many profiles.

    TODO I'm basing this off of coffee bean corrals flavor profile,
         but, I could consider using different sources, or, make it fully customizable
    """

    # TODO us this for json validation on save
    class Flavors(Enum):
        SPICY = "spicy"
        CHOCOLATEY = "chocolatey"
        NUTTY = "nutty"
        BUTTERY = "buttery"
        FRUITY = "fruity"
        FLOWERY = "flowery"
        WINEY = "winey"
        EARTHY = "earthy"

    # TODO us this for json validation on save
    class Attributes(Enum):
        BRIGHTNESS = "brightness"
        BODY = "body"
        AROMA = "armona"
        COMPLEXITY = "complexity"
        BALANCE = "balance"
        SWEETNESS = "sweetness"

    # TODO make profiles customizable?
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    roast = models.ForeignKey("roast.Roast", on_delete=models.CASCADE, related_name="profile")
    flavors = models.JSONField(null=True, blank=True)
    attributes = models.JSONField(null=True, blank=True)

    class Meta:
        db_table = "roast_profiles"
