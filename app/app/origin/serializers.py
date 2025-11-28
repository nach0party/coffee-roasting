from rest_framework import serializers
from app.origin.models.origin import Origin


class OriginSerializer(serializers.ModelSerializer):
    """
    Exposes origin information.
    """

    class Meta:
        model = Origin
        fields = "__all__"
