from enum import Enum
from django.db import models
from uuid import uuid4
from rest_framework.exceptions import ValidationError
from app.shared.mixins import TimeStampMixin


class RoastProfileFlavors(TimeStampMixin):
    """
    Provides a set of customizable roast profile flavors, multiple flavors
    per roast profile.  Flavors are independently maintained and independent
    to keep data normalizedj.
    """

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    roast_profile = models.ForeignKey(
        "roast.RoastProfile",
        on_delete=models.CASCADE,
        related_name="roast_profile_flavors",
    )
    roast_flavor = models.ForeignKey(
        "roast.RoastFlavors",
        on_delete=models.CASCADE,
        related_name="roast_profile_flavors",
        null=True,
        blank=True,
    )
    scale = models.PositiveSmallIntegerField(
        default=50,
        help_text="Provides a scale from 1-100 of how much of a certain flavor is detected in a roast profile.",
        null=True,
        blank=True,
    )

    def save(self, *args, **kwargs) -> None:
        if self.scale < 0:
            raise ValidationError({"scale": ["Cannot be lower than 0"]})
        if self.scale > 100:
            raise ValidationError({"scale": ["Cannot be greater than 100"]})
        return super().save(*args, **kwargs)

    class Meta:
        db_table = "roast_profile_flavors"
        ordering = ["created_when"]
