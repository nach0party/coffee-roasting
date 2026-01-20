from typing import Type, cast
from rest_framework.serializers import ModelSerializer
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import action
from app.shared.viewsets import CoffeeRoastingModelViewSet
from app.bean.models import Bean
from app.bean.serializers import BeanReadSerializer, BeanUpsertDeleteSerializer
from app.analytics.bean.bean_roast_profile_analysis import BeanRoastProfileAnalysis


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

    @action(methods=["get"], detail=True, url_path="roasts/analytics")
    def analytics(self, request: Request, pk: str | None = None) -> Response:
        bean = cast(Bean, self.get_object())
        return Response(BeanRoastProfileAnalysis(bean).retrieve())
