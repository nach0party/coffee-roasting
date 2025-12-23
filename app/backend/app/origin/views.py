from pycountry import countries

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.request import Request

from app.shared.viewsets import CoffeeRoastingModelViewSet
from app.origin.models.origin import Origin
from app.origin.serializers import OriginSerializer


class OriginViewSet(CoffeeRoastingModelViewSet):

    queryset = Origin.objects.filter(deleted_when=None)
    serializer_class = OriginSerializer

    # TODO are we certain we want to do this?  Might make a HUGE selectfield...
    # TODO consider maybe a "typeahead" select field that filters based off the valid possibilities...
    @action(methods=["get"], detail=False, url_path="countries")
    def retrieve_valid_countries(self, request: Request) -> Response:
        country_list = [country.name for country in countries]
        return Response(
            {
                "results": country_list,
                "count": len(country_list),
            }
        )
