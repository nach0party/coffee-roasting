from uuid import uuid4
from enum import Enum
from django.db import models
from app.shared.mixins import TimeStampMixin


class RoastEvent(TimeStampMixin):
    """
    Model for managing multiple events that happen during the roasting process.
    Each event is timestamped subsquently so we can keep track of how the roast goes.

    TODO consider making the "types" dynamic, but, for now, lets just setup some static types
    TODO consider programatic guidance on the types of events and general flows when creating a new
         event
    """

    class Type(Enum):
        PAUSE = "pause"
        DRY_PHASE = "dry_phase"
        FIRST_CRACK = "first_crack"
        SECOND_CRACK = "second_crack"

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    roast = models.OneToOneField(
        "roast.Roast",
        on_delete=models.DO_NOTHING,
        related_name="roast_event",
    )
    started_when = models.DateTimeField(
        null=True, blank=True, help_text="When the event tecnically started"
    )
    ended_when = models.DateTimeField(
        null=True, blank=True, help_text="When the even technically ended"
    )
    type = models.CharField(
        max_length=255, choices=[(type_choice.value, type_choice.name) for type_choice in Type]
    )
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="The roaster may or may not want to add in some information about the event",
    )

    class Meta:
        db_table = "roast_event"
        ordering = ["-created_when"]
