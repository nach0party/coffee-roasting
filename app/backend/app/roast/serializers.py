from rest_framework import serializers
from app.bean.models.bean import Bean
from app.roast.models.roast import Roast
from app.roast.models.roast_event import RoastEvent
from app.roast.models.roast_profile import RoastProfile
from app.roast.models.roast_profile_flavors import RoastProfileFlavors


# TODO should we also pull the origin
# TODO does separate API calls make more sense, or more nested serializers?
class RoastBeanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bean
        fields = "__all__"


class RoastEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoastEvent
        fields = "__all__"


class RetrieveListRoastSerializer(serializers.ModelSerializer):
    roast_event = RoastEventSerializer(read_only=True, many=True)
    bean = RoastBeanSerializer(read_only=True)

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
            "target_duration",
            "target_when",
        )


class RoastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roast
        fields = "__all__"


class RoastProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoastProfile
        fields = "__all__"


class RoastProfileFlavorSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoastProfileFlavors
        fields = "__all__"
