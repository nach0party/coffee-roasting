from typing import TypedDict


class RoastFlavorProfileAnalytics(TypedDict):
    label: str
    series_data: list[str] | None
    metrics: list[str] | None
