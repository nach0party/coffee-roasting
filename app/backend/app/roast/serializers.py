from rest_framework import serializers
from app.roast.models.roast import Roast
from app.roast.models.roast_event import RoastEvent


class RoastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roast
        fields = "__all__"


class RoastEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoastEvent
        fields = "__all__"
