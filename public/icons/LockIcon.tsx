import * as React from "react";
import { SVGProps } from "react";
const LockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    id="Icons"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    {...props}
  >
    <style type="text/css">
      {
        "\n\t.st0{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st1{fill:none;stroke:currentColor;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;}\n"
      }
    </style>
    <path
      className="st0"
      d="M10,15V8.9C10,5.6,12.7,3,16,3h0c3.3,0,6,2.6,6,5.9V15"
    />
    <circle className="st0" cx={16} cy={21} r={2} />
    <line className="st0" x1={16} y1={25} x2={16} y2={23} />
    <path
      className="st0"
      d="M22,28H10c-2.2,0-4-1.8-4-4v-5c0-2.2,1.8-4,4-4h12c2.2,0,4,1.8,4,4v5C26,26.2,24.2,28,22,28z"
    />
  </svg>
);
export default LockIcon;
