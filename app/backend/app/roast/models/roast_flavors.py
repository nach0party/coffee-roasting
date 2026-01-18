from uuid import uuid4
from django.db import models
from app.shared.mixins import TimeStampMixin


class RoastFlavors(TimeStampMixin):
    """
    These are UNIQUE flavors, and assist in trying to provide
    roast flavor profile.  This data is static, if it exists,
    it should be reused and is normalized data.
    """

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=255)

    class Meta:
        db_table = "roast_flavors"
        # TODO have a condition if it's deleted it doens't care about the uniqueness
        constraints = [
            models.UniqueConstraint(
                fields=["name"],
                name="unique_flavor",
                condition=models.Q(deleted_when=None),
            )
        ]

    # we should use some fuzzy matching to see how close an option is to a
    # # another (case wise) to make sure we're not fucking up this name field with junk
    # def save(self, force_insert=..., force_update=..., using=..., update_fields=...):
    #     return super().save(force_insert, force_update, using, update_fields)
