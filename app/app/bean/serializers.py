from rest_framework import serializers
from app.bean.models import Bean


class BeanSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bean
        fields = "__all__"
        read_only_fields = (
            "id",
            "updated_when",
            "created_when",
        )
