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

    TODO this is more of a flavor / cupping profile, renaming?
    """

    if TYPE_CHECKING:
        roast_id: UUID

    # TODO should this be customizable? I think so... there's a lot of ways to perceive roast tastes
    # TODO us this for json validation on save
    # TODO these should just be basic examples, anyone should be able to describe this anyway they see fit....
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
    # TODO these should just be basic examples, anyone should be able to describe this anyway they see fit....
    class Attributes(Enum):
        BRIGHTNESS = "brightness"
        BODY = "body"
        AROMA = "armona"
        COMPLEXITY = "complexity"
        BALANCE = "balance"
        SWEETNESS = "sweetness"

    class RoastLevels(Enum):
        """
        Maybe it makes more sense to further break this down?
        """

        LIGHT = "light"
        MEDIUM = "medium"
        DARK = "dark"

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    # Let's just keep it one profile to one roast for now....
    roast = models.OneToOneField(
        "roast.Roast", on_delete=models.CASCADE, related_name="roast_profile"
    )
    smell = models.JSONField(
        null=True, blank=True
    )  # TODO make totally custom, allow for any way to describe a flavor
    flavors = models.JSONField(
        null=True, blank=True
    )  # TODO make totally custom, allow for any way to describe a flavor
    attributes = models.JSONField(
        null=True, blank=True
    )  # TODO make totally custom, allow for any way to describe an attribute
    level = models.CharField(
        max_length=255,
        choices=[(level.value, level.name) for level in RoastLevels],
        null=True,
        blank=True,
    )

    class Meta:
        db_table = "roast_profiles"

    def delete(self, using: Any = None, keep_parents: bool = False) -> tuple[int, dict[str, int]]:
        count = RoastProfile.objects.filter(id=self.id).update(deleted_when=timezone.now())
        return (count, {self._meta.label: count})
