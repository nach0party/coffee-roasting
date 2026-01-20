from typing import TYPE_CHECKING, Any
from uuid import uuid4, UUID
from enum import Enum

from django.db import models
from django.utils import timezone
from django.db import transaction

from app.shared.mixins import TimeStampMixin


class RoastProfile(TimeStampMixin):
    """
    Data to essentialy be aggregated to provide
    information about the success of a roast.

    One roast to many profiles.

    The profile can have multiple flavors assigned to it to further enhance
    how the user feels about the profile.

    TODO separate the difference between cupping and a general roast profile?
    TODO you can use cuppings to aggregate and suggest an entire roast profile! - I find this to be useful.
    """

    if TYPE_CHECKING:
        from .roast_profile_flavors import RoastProfileFlavors

        roast_id: UUID
        roast_profile_flavors: models.QuerySet[RoastProfileFlavors]

    class RoastLevels(Enum):
        """
        Maybe it makes more sense to further break this down?
        TODO there are probably ways to make this better and more detailed
             like city, full city, etc, but this should be okay for now.
        """

        LIGHT = "light"
        MEDIUM = "medium"
        DARK = "dark"

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    roast = models.OneToOneField(
        "roast.Roast", on_delete=models.CASCADE, related_name="roast_profile"
    )
    level = models.CharField(
        max_length=255,
        choices=[(level.value, level.name) for level in RoastLevels],
        null=True,
        blank=True,
    )

    class Meta:
        db_table = "roast_profiles"

    @transaction.atomic()
    def delete(self, using: Any = None, keep_parents: bool = False) -> tuple[int, dict[str, int]]:
        count = RoastProfile.objects.filter(id=self.id).update(deleted_when=timezone.now())
        for flavor_profile in self.roast_profile_flavors.all():
            flavor_profile.delete()
        return (count, {self._meta.label: count})
