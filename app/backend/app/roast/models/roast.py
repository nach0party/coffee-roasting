from typing import Any, TYPE_CHECKING, Iterable
from uuid import uuid4, UUID
from django.db import models, transaction
from app.shared.mixins import TimeStampMixin


class Roast(TimeStampMixin):
    """
    A model for physically roasting a bean.
    This will track all of the things we care about:
    1. How did this go when we roasted the bean
    """

    if TYPE_CHECKING:
        from .roast_event import RoastEvent

        bean_id: UUID
        roast_event: models.QuerySet[RoastEvent]

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    bean = models.ForeignKey(
        "bean.Bean",
        on_delete=models.DO_NOTHING,
        related_name="roasts",
    )

    # we separate start / end for sanities sake. We manage the roast but once they actually "start it"
    started_when = models.DateTimeField(null=True, blank=True)
    ended_when = models.DateTimeField(null=True, blank=True)
    target_duration = models.DurationField(
        null=True,
        blank=True,
        help_text="This is a timestamp to represent the target amount of time from start to end (when they would like to stop the roast)",
    )
    target_when = models.DateTimeField(
        null=True,
        blank=True,
        help_text="In correspondance with target_duration we just want the end time in plain timestamp format without having to do a bunch of math.  Easier to do it server side",
    )
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="These are overall notes the roaster may or may not want to add in about the overall roast",
    )

    class Meta:
        db_table = "roasts"
        ordering = ["-created_when"]

    def save(
        self,
        force_insert: bool = False,
        force_update: bool = False,
        using: str = None,
        update_fields: Iterable[str] = None,
    ):
        # set the target time based on the duration selected
        if self.started_when and self.target_duration:
            self.target_when = self.started_when + self.target_duration
        return super().save(force_insert, force_update, using, update_fields)

    @transaction.atomic()
    def delete(self, using: Any = None, keep_parents: bool = False) -> tuple[int, dict[str, int]]:
        """
        TODO consider doing some soft deleting instead of hard deleting.
        """
        self.roast_event.all().delete()
        return super().delete(using, keep_parents)
