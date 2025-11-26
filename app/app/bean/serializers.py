from rest_framework import serializers


class BeanSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ("id",)
        read_only_fields = ("id",)
