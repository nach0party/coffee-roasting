from rest_framework import serializers
from app.bean.models import Bean
from app.origin.models import Origin


class BeanOriginSerializer(serializers.ModelSerializer):

    class Meta:
        model = Origin
        fields = (
            "id",
            "country",
            "region",
            "municipality",
        )


class BeanReadSerializer(serializers.ModelSerializer):

    origin = BeanOriginSerializer(read_only=True)

    class Meta:
        model = Bean
        fields = "__all__"
        read_only_fields = (
            "id",
            "updated_when",
            "created_when",
        )


class BeanUpsertDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bean
        fields = "__all__"
        read_only_fields = (
            "id",
            "updated_when",
            "created_when",
        )
