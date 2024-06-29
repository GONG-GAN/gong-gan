'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Map, MapMarker, MarkerClusterer, useKakaoLoader } from "react-kakao-maps-sdk";

import { getLocation } from "@/utils/modules";
import { getAddress, getBuildingInfo } from "@/app/_lib/api";
import { useMapLocation } from "@/app/_lib/store";
import MapComponent from "./MapComponent";
import PartLoadingUI from "../PartLoadingUI";

export default function MapSection() {
  const searchParams = useSearchParams();
  const paramLat = searchParams?.get('lat');
  const paramLng = searchParams?.get('lng');
  const router = useRouter();
  const [ markerInfo, setMarkerInfo ] = useState<MarkerInfoType[]>([]);
  const { mapLoc, setMapLoc } = useMapLocation();
  const [ loading ] = useKakaoLoader({
    appkey: process.env.KAKAO_JS_KEY,
  });

  const getUserLocation = useCallback(async () => {
    const userLoc: MapLocationType = await getLocation();
    setMapLoc(userLoc);
  }, [setMapLoc]);
  
  const markerClickHandler = (lat: number, lng: number, address: string) => {
    router.push(`/home?sidebar=true&lat=${lat}&lng=${lng}&address=${encodeURIComponent(address)}`);
  }

  const buildingClickHandler = async (_: any, mouseEvent: any) => {
    const latlng = mouseEvent.latLng;
    const lat = latlng.getLat();
    const lng = latlng.getLng();
    const addressInfo = await getAddress(lat, lng);
    const buildingInfo = await getBuildingInfo(addressInfo.documents[0].address.address_name);
    const buildingRoadAddress = buildingInfo.documents[0].road_address;
    const buildingName = buildingRoadAddress ? buildingRoadAddress.building_name : null;
    console.log(buildingName);
  }
  
  useEffect(() => {
    paramLat && paramLng ? setMapLoc({ lat: Number(paramLat), lng: Number(paramLng) }) : getUserLocation();
  }, [getUserLocation, paramLat, paramLng, setMapLoc]);

  return (
    <Map
      center={mapLoc}
      level={9}
      style={{ width: "100%", height: "84vh" }}
      isPanto={true}
      onClick={buildingClickHandler}
    >
      {loading && <PartLoadingUI />}
      <MapComponent setMarkerInfo={setMarkerInfo} />
      <MarkerClusterer
        averageCenter={true}
        minLevel={10}
        styles={[
          {
            width: '60px',
            height: '60px',
            backgroundColor: '#4a69f5bd',
            backdropFilter: 'blur(1px)',
            borderRadius: '100%',
            fontSize: 'large',
            textAlign: 'center',
            lineHeight: '60px',
            color: 'white',
          }
        ]}>
        {markerInfo.map((marker) => (
          <MapMarker
            position={{ lat: marker.latitude, lng: marker.longitude }}
            clickable={true}
            onClick={() => markerClickHandler(marker.latitude, marker.longitude, marker.address)}
            key={marker._id}
          />
        ))}
      </MarkerClusterer>
    </Map>
  );
}

interface MarkerInfoType {
  _id: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface MapLocationType {
  lat: number;
  lng: number;
}