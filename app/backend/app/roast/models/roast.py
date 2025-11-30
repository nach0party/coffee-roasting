from uuid import uuid4
from django.db import models
from app.shared.mixins import TimeStampMixin


class Roast(TimeStampMixin):
    """
    A model for physically roasting a bean.
    This will track all of the things we care about:
    1. How did this go when we roasted the bean
    """

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    bean = models.OneToOneField(
        "bean.Bean",
        on_delete=models.DO_NOTHING,
        related_name="roast",
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
