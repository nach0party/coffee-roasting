from typing import cast
from app.roast.models.roast_profile_flavors import RoastProfileFlavors
from .types import RoastFlavorProfileAnalytics


def transform_roast_flavor_profiles(
    bean_name: str, roast_profile_flavors: list[RoastProfileFlavors]
) -> RoastFlavorProfileAnalytics:
    """
    Pass in any series of roast profile flavors, it can be per bean,
    per roast, whatever, and this function will transform it into something
    our frontend recognizes as analytics to power our profile graph.
    """

    transformed_data = cast(RoastFlavorProfileAnalytics, {})
    for index, flavor in enumerate(roast_profile_flavors):
        if index == 0:
            transformed_data["label"] = bean_name

        if transformed_data.get("series_data") is None:
            transformed_data["series_data"] = []
        if transformed_data.get("metrics") is None:
            transformed_data["metrics"] = []

        # only chose the ones that have been fully established / selected in the UI
        if flavor.roast_flavor_id:
            transformed_data["series_data"].append(flavor.scale)
            transformed_data["metrics"].append(flavor.roast_flavor.name)

    return transformed_data
