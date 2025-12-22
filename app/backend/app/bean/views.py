from typing import Type
from rest_framework.serializers import ModelSerializer
from app.shared.viewsets import CoffeeRoastingModelViewSet
from app.bean.models import Bean
from app.bean.serializers import BeanReadSerializer, BeanUpsertDeleteSerializer


class BeansViewSet(CoffeeRoastingModelViewSet):
    """
    For Tracking the different possible types
    of beans that can be roasted.
    """

    queryset = Bean.objects.select_related("origin").filter(deleted_when=None)
    search_fields = [
        "name",
        "processing",
        "sca_letter_grade",
        "origin__country",
        "origin__region",
        "origin__municipality",
    ]

    def get_serializer_class(self) -> Type[ModelSerializer]:
        if self.action in ["retrieve", "list"]:
            return BeanReadSerializer
        return BeanUpsertDeleteSerializer
