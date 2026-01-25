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

    pre_analytic_data: dict[str, list[int]] = {}
    for flavor in roast_profile_flavors:
        if flavor.roast_flavor_id:
            if not pre_analytic_data.get(flavor.roast_flavor.name):
                pre_analytic_data[flavor.roast_flavor.name] = []
            pre_analytic_data[flavor.roast_flavor.name].append(flavor.scale)

    transformed_aggregate_data = cast(RoastFlavorProfileAnalytics, {})
    transformed_aggregate_data["label"] = bean_name
    transformed_aggregate_data["series_data"] = []
    transformed_aggregate_data["metrics"] = []
    for roast_flavor_name, index_list in pre_analytic_data.items():
        transformed_aggregate_data["series_data"].append(roast_flavor_name)
        value_length = len(index_list)
        if value_length > 1:
            transformed_aggregate_data["metrics"].append(round(sum(index_list) / value_length))
        else:
            transformed_aggregate_data["metrics"].append(index_list[0] if index_list else None)

    return transformed_aggregate_data
