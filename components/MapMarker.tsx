'use client'

import { Marker, Popup } from 'react-leaflet'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  latitude: number
  longitude: number
  title?: string | any
  key?: string | any
}

export default function MapMarker(props: Props) {
  const { children, latitude, longitude, title, key } = props

  return (
    <Marker key={key} position={{ lat: latitude, lng: longitude }}>
      <Popup className="max-w-md">
        <h4 className="text-center text-lg lowercase">{title}</h4>
        <div className="w-full">{children}</div>
      </Popup>
    </Marker>
  )
}
