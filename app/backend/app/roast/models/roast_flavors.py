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
