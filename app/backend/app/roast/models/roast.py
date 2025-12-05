from typing import Any, TYPE_CHECKING
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
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="These are overall notes the roaster may or may not want to add in about the overall roast",
    )

    class Meta:
        db_table = "roast"
        ordering = ["-created_when"]

    @transaction.atomic()
    def delete(self, using: Any = None, keep_parents: bool = False) -> tuple[int, dict[str, int]]:
        """
        TODO consider doing some soft deleting instead of hard deleting.
        """
        self.roast_event.all().delete()
        return super().delete(using, keep_parents)
