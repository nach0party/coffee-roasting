from rest_framework import serializers
from app.roast.models.roast import Roast
from app.roast.models.roast_event import RoastEvent


class RoastEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoastEvent
        fields = "__all__"


class RetrieveListRoastSerializer(serializers.ModelSerializer):
    roast_event = RoastEventSerializer(read_only=True, many=True)

    class Meta:
        model = Roast
        fields = (
            "id",
            "roast_event",
            "bean",
            "started_when",
            "ended_when",
            "notes",
            "created_when",
            "updated_when",
            "deleted_when",
        )


class RoastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roast
        fields = "__all__"
