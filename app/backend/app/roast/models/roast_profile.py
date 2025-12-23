from typing import TYPE_CHECKING, Any
from uuid import uuid4, UUID
from enum import Enum
from app.shared.mixins import TimeStampMixin
from django.db import models
from django.utils import timezone


class RoastProfile(TimeStampMixin):
    """
    Data to essentialy be aggregated to provide
    information about the success of a roast.

    One roast to many profiles.

    TODO I'm basing this off of coffee bean corrals flavor profile,
         but, I could consider using different sources, or, make it fully customizable
    """

    if TYPE_CHECKING:
        roast_id: UUID

    # TODO should this be customizable? I think so... there's a lot of ways to perceive roast tastes
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
    roast = models.ForeignKey("roast.Roast", on_delete=models.CASCADE, related_name="roast_profile")
    flavors = models.JSONField(null=True, blank=True)
    attributes = models.JSONField(null=True, blank=True)

    class Meta:
        db_table = "roast_profiles"

    def delete(self, using: Any = None, keep_parents: bool = False) -> tuple[int, dict[str, int]]:
        count = RoastProfile.objects.filter(id=self.id).update(deleted_when=timezone.now())
        return (count, {self._meta.label: count})
