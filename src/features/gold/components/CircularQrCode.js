import React from 'react';
import { View, Image } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';
import { encode as btoa } from 'base-64';
import { encode as utf8Encode } from 'utf8';
import CustomTheme from '../../../shared/styles/CustomThems';

const PRIMARY = CustomTheme.colors.primary;
const SECONDARY = CustomTheme.colors.secondary;

export default function CircularQrCode({ phone = '', name = '' }) {
  const raw = JSON.stringify({ phone, name });
  const base64 = btoa(utf8Encode(raw));

  // Base64'ü binary'ye çevir, ve sabit uzunluk sağla
  let binary = base64
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');

  // Sabit 112 bit alalım (gerekiyorsa sıfırla dolduralım)
  binary = binary.padEnd(112, '0').slice(0, 112);

  const totalSegmentsPerRing = [16, 24, 32, 40];
  const radiusBase = 60;
  const radiusGap = 14;
  const strokeWidth = 4.5;
  const segmentGapAngle = 0.1;

  const positionMarkers = [
    { cx: 60, cy: 48, outerR: 13, ringR: 20 },
    { cx: 164, cy: 62, outerR: 15, ringR: 22 },
    { cx: 66, cy: 162, outerR: 12, ringR: 19 },
  ];

  const renderPositionMarkers = () =>
    positionMarkers.map((pos, i) => (
      <G key={`marker-${i}`}>
        <Circle cx={pos.cx} cy={pos.cy} r={pos.ringR} fill="#fff" />
        <Circle
          cx={pos.cx}
          cy={pos.cy}
          r={pos.outerR}
          fill="none"
          stroke={PRIMARY}
          strokeWidth={strokeWidth}
        />
        <Circle cx={pos.cx} cy={pos.cy} r={pos.outerR * 0.4} fill="#fff" />
      </G>
    ));

  const renderRings = () => {
    let offset = 0;
    return totalSegmentsPerRing.flatMap((count, ringIndex) => {
      const radius = radiusBase + ringIndex * radiusGap;
      const anglePerSegment = (2 * Math.PI) / count;

      return Array.from({ length: count }).map((_, i) => {
        const bitIndex = offset + i;
        const bit = binary[bitIndex];
        if (bit !== '1') return null;

        const startAngle = i * anglePerSegment - Math.PI / 2 + segmentGapAngle / 2;
        const endAngle = startAngle + anglePerSegment * 0.82 - segmentGapAngle;
        const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

        const x1 = 110 + radius * Math.cos(startAngle);
        const y1 = 110 + radius * Math.sin(startAngle);
        const x2 = 110 + radius * Math.cos(endAngle);
        const y2 = 110 + radius * Math.sin(endAngle);

        const strokeColor = (i + ringIndex) % 2 === 0 ? PRIMARY : SECONDARY;

        const tooCloseToMarker = positionMarkers.some(
          m => Math.hypot(x1 - m.cx, y1 - m.cy) < m.ringR + 6
        );
        if (tooCloseToMarker) return null;

        return (
          <Path
            key={`r${ringIndex}-s${i}`}
            d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
        );
      });
      offset += count;
    });
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={220} height={220}>
        <Circle cx={110} cy={110} r={95} fill="#fff" />
        {renderRings()}
        {renderPositionMarkers()}
        <Circle cx={110} cy={110} r={42} fill="#fff" />
      </Svg>
      <Image
        source={require('../../../assets/logo/app_icon.png')}
        style={{
          width: 84,
          height: 84,
          position: 'absolute',
          top: 68,
          left: 68,
          borderRadius: 42,
        }}
      />
    </View>
  );
}
