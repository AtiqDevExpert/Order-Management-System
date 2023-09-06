import React from "react";
import Svg, { Defs, ClipPath, Path, G, Circle, LinearGradient, Stop, Rect } from "react-native-svg"

export const LockIcon = (props)=> {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={74} height={74} {...props}>
          <G data-name="Group 530">
            <G
              data-name="Ellipse 28"
              transform="translate(4 4)"
              fill="#fff"
              stroke={props.color}
              strokeWidth={4}
            >
              <Circle cx={33} cy={33} r={33} stroke="none" />
              <Circle cx={33} cy={33} r={35} fill="none" />
            </G>
            <Path
              data-name="Path 403"
              d="M23.416 52.908a3.046 3.046 0 11-3.046 3.046 3.046 3.046 0 013.046-3.046zm6.459 3.046a3.046 3.046 0 103.046-3.046 3.046 3.046 0 00-3.046 3.046zm9.5 0a3.046 3.046 0 103.046-3.046 3.046 3.046 0 00-3.046 3.046zm9.491 0a3.046 3.046 0 103.046-3.046 3.046 3.046 0 00-3.041 3.046zm-6.848-27.489v-2.24a4.479 4.479 0 00-3.9-4.524 4.6 4.6 0 00-.52-.031 4.327 4.327 0 00-2.907 1.12 4.4 4.4 0 00-1.129 1.586 2.8 2.8 0 01-2.593 1.684 2.831 2.831 0 01-2.656-3.866A10.109 10.109 0 0137.673 16h.227a10.257 10.257 0 019.78 10.271v2.24h-.058a3.256 3.256 0 012.719 3.207v11.824a3.261 3.261 0 01-3.261 3.274H28.267a3.261 3.261 0 01-3.261-3.261V31.731a3.261 3.261 0 013.261-3.265zm-4.927 4.354a2.979 2.979 0 00-.99 5.451v2.688a1.572 1.572 0 001.572 1.559 1.572 1.572 0 001.572-1.572v-2.688a2.979 2.979 0 00-2.154-5.438z"
              fill={props.color}
            />
          </G>
        </Svg>
      )
  }

export const PrinterIcon = (props) => {
  return (
    <Svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
        <G>
          <Path d="M899.4,349.8h-81l0-300c0-21.9-18.2-39.7-40.5-39.7H222.1c-22.3,0-40.5,17.8-40.5,39.7v300h-81c-35.1,0-63.7,26.8-63.7,59.8v401.4c0,33,28.6,59.8,63.7,59.8h81v81.8c0,21,17.8,37.4,40.5,37.4h555.7c22.7,0,40.5-16.4,40.5-37.4v-81.8h81c35.1,0,63.7-26.8,63.7-59.8l0-401.4C963.1,376.6,934.5,349.8,899.4,349.8z M239.5,67.9h521v266.3h-521V67.9z M760.5,932.1h-521V735.3h521V932.1z M905.2,810.7c-0.5,0.7-2.4,2.2-5.8,2.2h-81v-98c0-21-17.8-37.4-40.5-37.4H222.1c-22.7,0-40.5,16.4-40.5,37.4v98h-81c-3.3,0-5.3-1.5-5.8-2.2l0-400.8c0.5-0.7,2.4-2.2,5.8-2.2h798.9c3.3,0,5.3,1.5,5.8,2.2V810.7z"/>
          <Path d="M314.8,121.8h370.5v57.9H314.8V121.8z"/>
          <Path d="M314.8,228.4H500v57.9H314.8L314.8,228.4L314.8,228.4z"/>
          <Path d="M656.3,513.8c0,16,13,28.9,28.9,28.9c16,0,28.9-13,28.9-28.9c0-16-13-28.9-28.9-28.9C669.3,484.9,656.3,497.8,656.3,513.8z"/>
          <Path d="M760.5,513.8c0,16,13,28.9,28.9,28.9c16,0,28.9-13,28.9-28.9c0-16-13-28.9-28.9-28.9C773.5,484.9,760.5,497.8,760.5,513.8z"/>
      </G>
    </Svg>
  )
}
  export const BackIcon = (props)=>{
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
        <Defs>
          <ClipPath id="prefix__a">
            <Path fill="none" d="M0 0h24v24H0z" />
          </ClipPath>
        </Defs>
        <G clipPath="url(#prefix__a)">
          <Path data-name="Rectangle 7" fill="none" d="M0 0h24v24H0z" />
          <Path
            data-name="Path 1"
            d="M23.743 12.019a1.531 1.531 0 00-1.531-1.531H5.421l6.223-5.8a1.531 1.531 0 10-2.09-2.235L.487 10.898a1.531 1.531 0 000 2.239l9.067 8.451a1.531 1.531 0 002.09-2.239l-6.223-5.8h16.791a1.531 1.531 0 001.531-1.53z"
            fill={props.color}
          />
        </G>
      </Svg>
    )
  }

  export const HomeIcon = (props) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={26.522}
        height={27.139}
        {...props}
      >
        <Defs>
          <ClipPath id="prefix__a">
            <Path fill="none" d="M0 0h26.522v27.139H0z" />
          </ClipPath>
        </Defs>
        <G clipPath="url(#prefix__a)">
          <G data-name="Group 4546">
            <Path
              data-name="Path 2867"
              d="M12.7.183L.366 9.438A.94.94 0 000 10.18v16.037a.961.961 0 00.925.925H25.6a.961.961 0 00.925-.925v-16.04a.945.945 0 00-.366-.742L13.82.183a.947.947 0 00-1.12 0zm.559 1.9l11.413 8.555v14.649H1.85V10.638z"
              fill={props.color}
            />
          </G>
          <Path
            data-name="Path 326"
            d="M9.115 21.524a2.833 2.833 0 002.02-.866.057.057 0 01.058-.058 2.751 2.751 0 00.693-1.27l.981-1.847.981 1.847a2.751 2.751 0 00.693 1.27.057.057 0 00.058.058 2.939 2.939 0 002.02.866 2.886 2.886 0 10-2.195-4.728l-.577-1.1 2.655-5.021a.852.852 0 00-1.5-.808l-2.135 3.982-2.138-3.982a.852.852 0 00-1.5.808l2.656 5.021-.577 1.1a2.878 2.878 0 10-2.193 4.732zm6.348-2.886a1.154 1.154 0 111.154 1.158 1.216 1.216 0 01-.75-.289l-.4-.75zm-6.348-1.154a1.158 1.158 0 011.154 1.154v.115l-.4.75a1.215 1.215 0 01-.75.289 1.154 1.154 0 110-2.308z"
            fill={props.color}
          />
        </G>
      </Svg>
    )
  }

  export const IndboxIcon = (props) => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={28} height={25} {...props}>
        <Defs>
          <ClipPath id="prefix__a">
            <Path fill="none" d="M0 0h28v25H0z" />
          </ClipPath>
        </Defs>
        <G clipPath="url(#prefix__a)">
          <G data-name="Group 4554" transform="translate(-2 -6)" fill={props.color}>
            <Path
              data-name="Path 2873"
              d="M27.14 6H4.86A2.83 2.83 0 002 8.8v14.4A2.83 2.83 0 004.86 26h10.78l5.72 4.77A1 1 0 0023 30v-4h4.14A2.83 2.83 0 0030 23.2V8.8A2.83 2.83 0 0027.14 6zM28 23.2a.83.83 0 01-.86.8H22a1 1 0 00-1 1v2.87l-4.36-3.64a.67.67 0 00-.12-.06.81.81 0 00-.18-.1.78.78 0 00-.21 0A.5.5 0 0016 24H4.86a.83.83 0 01-.86-.8V8.8a.84.84 0 01.86-.8h22.28a.84.84 0 01.86.8z"
            />
            <Circle
              data-name="Ellipse 331"
              cx={2}
              cy={2}
              r={2}
              transform="translate(8 14)"
            />
            <Circle
              data-name="Ellipse 332"
              cx={2}
              cy={2}
              r={2}
              transform="translate(14 14)"
            />
            <Circle
              data-name="Ellipse 333"
              cx={2}
              cy={2}
              r={2}
              transform="translate(20 14)"
            />
          </G>
        </G>
      </Svg>
    )
  }





  export const OfficeIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-6 prefix__w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke={props.color}
        width={30} height={30}
        {...props}
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </Svg>
    )
  }


  export const OfferIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-6 prefix__w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke={props.color}
        width={30} height={30}
        {...props}
        
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
        />
      </Svg>
    )
  }


  export const PhotographIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-6 prefix__w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke={props.color}
        width={30} height={30}
        {...props}
        
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </Svg>
    )
  }


  export const RatingIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-6 prefix__w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke={props.color}
        width={30} height={30}
        {...props}
        
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </Svg>
    )
  }



  export const ProfileIcon = (props) => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={26} {...props}>
        <Defs>
          <ClipPath id="prefix__a">
            <Path fill="none" d="M0 0h22v26H0z" />
          </ClipPath>
        </Defs>
        <G data-name="Group 4555" fill={props.color} clipPath="url(#prefix__a)">
          <Path
            data-name="Path 2874"
            d="M11 14a7 7 0 117-7 7 7 0 01-7 7zm0-2a5 5 0 10-5-5 5 5 0 005 5z"
          />
          <Path
            data-name="Path 2875"
            d="M20 24v-2a9 9 0 00-6.506-8.65l.553-1.922A11 11 0 0122 22v3a1 1 0 01-1 1H1a1 1 0 01-1-1v-3a11 11 0 018.112-10.617l.524 1.93A9 9 0 002 22v2z"
          />
        </G>
      </Svg>
    )
  }


  export const FilterIcon = (props) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20.33}
        height={20.33}
        {...props}
      >
        <Defs>
          <ClipPath id="prefix__a">
            <Path fill="none" d="M0 0h20.33v20.33H0z" />
          </ClipPath>
        </Defs>
        <G clipPath="url(#prefix__a)">
          <Path
            data-name="Path 5"
            d="M20.079 1.841A1.13 1.13 0 0019.2 0H1.129A1.129 1.129 0 00.084.706a1.062 1.062 0 00-.085.424 1.129 1.129 0 00.257.717l.714.873L5 7.638l2.555 3.106a1.129 1.129 0 01.35.833V19.2a1.128 1.128 0 001.782.921l.068-.051 2.166-1.626.062-.045a1.129 1.129 0 00.44-.892v-5.93a1.129 1.129 0 01.347-.816l2.558-3.123 4.744-5.791z"
            fill={props.color}
          />
        </G>
      </Svg>
    )
  }

  export const SearchIcon = (props) => {
    return (
      <Svg
        data-name="Search Glyph"
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={13.999}
        {...props}
      >
        <Path
          d="M13.173 14a.831.831 0 01-.6-.256L8.745 9.912a5.373 5.373 0 01-3.221 1.062H5.5a5.51 5.51 0 01-3.91-9.382A5.476 5.476 0 015.437 0h.023a5.532 5.532 0 015.5 5.508A5.386 5.386 0 019.91 8.74l3.833 3.834a.827.827 0 01-.57 1.426zM5.444 1.1A4.375 4.375 0 002.39 8.58 4.4 4.4 0 005.5 9.878h.017A4.39 4.39 0 005.464 1.1z"
          fill={props.color}
        />
      </Svg>
    )
  }

  export const StartIcon  = (props) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={12.136}
        height={11.593}
        {...props}
      >
        <G data-name="Group 455">
          <G data-name="Group 454">
            <Path
              data-name="Path 316"
              d="M6.068 0a.519.519 0 00-.492.354L4.356 4l-3.842.034a.519.519 0 00-.3.936L3.3 7.253l-1.156 3.665a.519.519 0 00.8.578l3.128-2.23L9.2 11.5a.519.519 0 00.8-.578L8.846 7.257l3.088-2.286a.519.519 0 00-.3-.936L7.78 4 6.56.354A.519.519 0 006.068 0"
              fill={props.color}
              fillRule="evenodd"
            />
          </G>
        </G>
      </Svg>
    )
  }

  export const LocationIcon = (props) => {
    return (
        <Svg
          data-name="Group 432"
          xmlns="http://www.w3.org/2000/svg"
          width={12.423}
          height={17.074}
          {...props}
        >
          <Path
            data-name="Path 111"
            d="M6.2 17.074C4.077 14.356 0 9.917 0 6.371A6.37 6.37 0 016.2 0a6.373 6.373 0 016.222 6.371c.001 3.546-4.076 7.985-6.222 10.703zm0-13.889a3.185 3.185 0 11-3.184 3.186A3.2 3.2 0 016.2 3.185z"
            fill={props.color}
            fillRule="evenodd"
          />
        </Svg>
      )
  }

  export const DirectionIcon = (props) => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} {...props}>
        <G data-name="Group 434">
          <Path
            data-name="Path 315"
            d="M8.522 14h-.037a.657.657 0 01-.6-.494l-1.5-5.889-5.889-1.5a.657.657 0 01-.071-1.251L13.109.043a.657.657 0 01.848.848L9.136 13.576a.656.656 0 01-.614.424zm-5.69-8.646l4.254 1.085a.657.657 0 01.474.474l1.085 4.254 3.563-9.377z"
            fill={props.color}
          />
        </G>
      </Svg>
    )
  }

  export const SelectBoxDownArrow = (props) => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={10} height={6} {...props}>
        <Path
          data-name="Polygon 1"
          d="M5.384 5.539a.5.5 0 01-.768 0L.683.82A.5.5 0 011.068 0h7.864a.5.5 0 01.384.82z"
          fill={props.color}
        />
      </Svg>
    )
  }

  export const TickMarWithCircleIcon = (props) => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={74} height={74} {...props}>
        <G data-name="Group 530" stroke={props.color}>
          <G
            data-name="Ellipse 28"
            transform="translate(4 4)"
            fill={props.color}
            strokeWidth={4}
          >
            <Circle cx={33} cy={33} r={33} stroke="none" />
            <Circle cx={33} cy={33} r={35} fill="none" />
          </G>
          <Path
            data-name="Path 402"
            d="M21.434 39.965l12.152 11.223 21.707-26.375"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={6}
            stroke="#FFF"
          />
        </G>
      </Svg>
    )
  }

  export const WebsitIcon = (props) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={25.656}
        height={26.47}
        {...props}
      >
        <Path
          data-name="Path 374"
          d="M12.828.15A13.11 13.11 0 00.199 9.822h1.184a11.947 11.947 0 012-3.878A15.284 15.284 0 006.723 7.3a21.194 21.194 0 00-.5 2.522h1.16a20.77 20.77 0 01.46-2.24 22.81 22.81 0 004.411.516v1.725h1.145V8.097a22.637 22.637 0 004.411-.516 20.771 20.771 0 01.46 2.24h1.16a21.194 21.194 0 00-.5-2.522 15.284 15.284 0 003.34-1.356 11.9 11.9 0 012 3.878h1.189A13.11 13.11 0 0012.828.15zm-.569 1.207v5.6a21.643 21.643 0 01-4.089-.476c.935-2.795 2.418-4.755 4.089-5.124zm1.138 0c1.671.369 3.153 2.329 4.089 5.127a21.643 21.643 0 01-4.087.475zm-3.907.416a11.762 11.762 0 00-2.445 4.431 14.511 14.511 0 01-2.909-1.147A11.971 11.971 0 019.49 1.772zm6.676 0a11.971 11.971 0 015.353 3.284 14.511 14.511 0 01-2.909 1.147 11.762 11.762 0 00-2.444-4.432zM.311 10.959l1.445 4.551H3.08l1.2-3.4 1.2 3.4h1.3l1.471-4.551H7.025l-.926 3.181-1.062-3.18H3.583l-1.107 3.126-.913-3.127zm8.543 0l1.445 4.552h1.327l1.2-3.4 1.207 3.4h1.3l1.466-4.552h-1.231l-.927 3.18-1.062-3.18h-1.454l-1.106 3.127-.911-3.127zm8.516 0l1.449 4.551h1.331l1.207-3.4 1.211 3.4h1.3l1.476-4.551h-1.236l-.933 3.18-1.064-3.18h-1.459l-1.111 3.127-.918-3.127zM.199 16.65a13.085 13.085 0 0025.264 0H24.27a11.9 11.9 0 01-2 3.878 15.284 15.284 0 00-3.34-1.356 21.194 21.194 0 00.5-2.522h-1.16a20.77 20.77 0 01-.46 2.24 22.81 22.81 0 00-4.411-.517V16.65h-1.14v1.725a22.638 22.638 0 00-4.411.516 20.77 20.77 0 01-.46-2.24H6.227a21.194 21.194 0 00.5 2.522 15.283 15.283 0 00-3.34 1.356 11.947 11.947 0 01-2-3.878zm12.06 2.861v5.6c-1.671-.369-3.153-2.329-4.089-5.127a21.643 21.643 0 014.089-.473zm1.138 0a21.643 21.643 0 014.089.476c-.936 2.8-2.418 4.758-4.089 5.127zm-6.349.756a11.732 11.732 0 002.442 4.429 11.947 11.947 0 01-5.354-3.282 14.35 14.35 0 012.911-1.147zm11.563 0a14.511 14.511 0 012.909 1.147 11.947 11.947 0 01-5.354 3.282 11.734 11.734 0 002.444-4.429z"
          fill={props.color}
          stroke={props.color}
          strokeWidth={0.3}
        />
      </Svg>
    )
  }


  export const CallIcon = (props) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={38.5}
        height={38.5}
        {...props}
      >
        <Path
          data-name="Path 35"
          d="M19.25 38.5L0 19.25 19.25 0 38.5 19.25z"
          fill="none"
        />
        <Path
          data-name="Path 36"
          d="M16.844 21.656a16.914 16.914 0 004.268 3.112l2.484-2.485a1.143 1.143 0 011.171-.273 13.057 13.057 0 003.619.649 1.114 1.114 0 01.786.336 1.131 1.131 0 01.336.802l.003 3.977a1.085 1.085 0 01-.333.798 1.131 1.131 0 01-.798.333A19.3 19.3 0 019.595 10.12a1.15 1.15 0 011.14-1.139h3.977a1.131 1.131 0 01.802.337 1.164 1.164 0 01.337.786 12.784 12.784 0 00.657 3.627 1.13 1.13 0 01-.273 1.17l-2.485 2.486a16.465 16.465 0 003.094 4.27z"
          fill={props.color}
        />
      </Svg>
    )
  }


  export const DirectionMapIcon = (props) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={28.768}
        height={30.171}
        {...props}
      >
        <G data-name="Group 471">
          <Path
            data-name="Path 342"
            d="M20.874 0a7.9 7.9 0 00-7.828 6.887L9.077 5.664a.964.964 0 00-.614 0L.745 8.055A1.053 1.053 0 000 9.059v7.435a1.053 1.053 0 102.105 0V9.826l5.613-1.733v17.865L2.1 27.702v-7.7a1.053 1.053 0 10-2.105 0v9.124a1.053 1.053 0 001.359 1l7.411-2.292 7.411 2.292a1.053 1.053 0 00.614 0l7.718-2.391a1.053 1.053 0 00.745-1V15.211c.28-.338.557-.681.822-1.031a11.027 11.027 0 002.686-6.284v-.022A7.9 7.9 0 0020.874 0zm0 2.106a5.761 5.761 0 015.789 5.757v.011a9.345 9.345 0 01-2.258 5.034c-1.077 1.419-2.353 2.8-3.53 4.112-1.178-1.318-2.465-2.692-3.541-4.112a9.338 9.338 0 01-2.247-5.034v-.011a5.76 5.76 0 015.787-5.757zm0 1.755a4.036 4.036 0 104.034 4.036 4.051 4.051 0 00-4.034-4.033zm0 2.106a1.93 1.93 0 11-1.93 1.93 1.914 1.914 0 011.93-1.933zM9.823 8.094l3.289 1.009a12.053 12.053 0 002.324 4.781v13.807l-5.613-1.733zm7.718 8.356c.9 1.016 1.795 1.968 2.533 2.829a1.052 1.052 0 001.59 0c.448-.523.962-1.084 1.491-1.667v8.346l-5.613 1.733z"
            fill={props.color}
          />
        </G>
      </Svg>
    )
  }


  export const ShareIcon = (props) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={25.626}
        height={22.247}
        {...props}
      >
        <G data-name="Group 521" fill={props.color}>
          <Path
            data-name="Path 372"
            d="M22.874 13.807a1.049 1.049 0 00-1.049 1.049v5.007a.286.286 0 01-.286.286H2.384a.286.286 0 01-.286-.286V2.847a.286.286 0 01.286-.286h10.282a1.05 1.05 0 000-2.1H2.384A2.387 2.387 0 000 2.847v17.016a2.386 2.386 0 002.384 2.384h19.155a2.386 2.386 0 002.384-2.384v-5.007a1.049 1.049 0 00-1.049-1.049z"
          />
          <Path
            data-name="Path 373"
            d="M25.486 5.909L19.369.123a.45.45 0 00-.759.327v3.414c-9.9.285-11.159 9.97-11.171 10.069a.45.45 0 00.837.275 10.893 10.893 0 019.659-5.485c.247 0 .456.008.619.018v3.447a.449.449 0 00.762.324l6.172-5.952a.45.45 0 000-.65z"
          />
        </G>
      </Svg>
    )
  }


  export const AddToBookmarkIcon = (props) => {
    return (
      <Svg
        data-name="Group 392"
        xmlns="http://www.w3.org/2000/svg"
        width={17}
        height={24.438}
        {...props}
      >
        <Path
          data-name="Path 16"
          d="M2.656 0A2.537 2.537 0 000 2.391V23.11a1.232 1.232 0 001.328 1.328.8.8 0 00.44-.141L8.5 19.806l6.732 4.491a.8.8 0 00.44.141A1.232 1.232 0 0017 23.11V2.391A2.537 2.537 0 0014.344 0zm0 1.594h11.688c.715 0 1.063.408 1.063.8v20.113l-6.466-4.308a.8.8 0 00-.88 0l-6.466 4.308V2.391c-.001-.389.347-.797 1.061-.797zM8.5 4.25a.8.8 0 00-.8.8v2.922H4.781a.8.8 0 000 1.594H7.7v2.922a.8.8 0 001.594 0V9.566h2.922a.8.8 0 000-1.594H9.3V5.05a.8.8 0 00-.8-.8z"
          fill={props.color}
        />
      </Svg>
    )
  }

  export const CircleIcon = (props) => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
        <Circle
          data-name="Ellipse 22"
          cx={9}
          cy={9}
          r={9}
          transform="translate(1 1)"
          fill={props.color}
          stroke="#fff"
          strokeWidth={2}
        />
      </Svg>
    )
  }

  export const RightAngleArrowIcon = (props) =>{
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
        <Path
          fill={props.color}
          d="M6.5 24a.5.5 0 01-.361-.846L16.808 12 6.138.846a.5.5 0 01.723-.692l11 11.5a.5.5 0 010 .692l-11 11.5A.5.5 0 016.5 24z"
        />
        <LinearGradient
          id="prefix__a"
          x1={1.642}
          x2={15.988}
          y1={9.735}
          y2={16.425}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0} stopColor="#fff" stopOpacity={0.2} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        <Path
          fill="url(#prefix__a)"
          d="M6.5 24a.5.5 0 01-.361-.846L16.808 12 6.138.846a.5.5 0 01.723-.692l11 11.5a.5.5 0 010 .692l-11 11.5A.5.5 0 016.5 24z"
        />
      </Svg>
    )
  }

  export const AboutUsIcon = (props) => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width={26.522}
      height={27.139} {...props} >
        <Path fill={props.color} d="M24 4C12.972 4 4 12.972 4 24c0 3.275.863 6.335 2.262 9.064l-2.168 7.764c-.505 1.804 1.278 3.585 3.082 3.08l7.767-2.168C17.671 43.137 20.727 44 24 44c11.028 0 20-8.972 20-20S35.028 4 24 4zm0 3c9.406 0 17 7.594 17 17 0 9.406-7.594 17-17 17-3.003 0-5.808-.782-8.256-2.146a1.5 1.5 0 00-1.135-.135L7.223 40.78l2.062-7.383a1.5 1.5 0 00-.135-1.134A16.89 16.89 0 017 24c0-9.406 7.594-17 17-17zm-.023 5.979A1.5 1.5 0 0022.5 14.5v12a1.5 1.5 0 103 0v-12a1.5 1.5 0 00-1.523-1.521zM24 31a2 2 0 000 4 2 2 0 000-4z" />
      </Svg>
    )
  }

  export const ContactUsIcon = (props) => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={26.522}
      height={27.139} {...props}>
        <Path fill={props.color} d="M3 3c-1.093 0-2 .907-2 2v14c0 1.093.907 2 2 2h18c1.093 0 2-.907 2-2V7c0-1.093-.907-2-2-2h-7.383l-.445-.893-.002-.002A2.004 2.004 0 0011.383 3H3zm0 2h8.38l1.003 2H21v12h-2v-1h-2v1H7v-1H5v1H3V5zm9 4a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2zm0 5c-2.185 0-4 .909-4 2.217V17h8v-.783C16 14.909 14.185 14 12 14z" />
      </Svg>
    )
  }

  export const LogoutIcon = (props) => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" width={26.522}
      height={27.139} {...props}>
        <Path fill={props.color} d="M8 2a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2v-5h-2v5H8V4h8v5h2V4a2 2 0 00-2-2H8zm12 6v3h-9v2h9v3l4-4-4-4z" />
      </Svg>
    )
  }

  export const CameraIcon = (props) => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
        <Path fill={props.color} d="M14.998 1.998l-6 .006L7.164 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.156l-1.846-2.002zm-.877 2L15.967 6H20v12H4V6h4.043l1.836-1.998 4.242-.004zM12 7a5 5 0 10.001 10.001A5 5 0 0012 7zm0 2a3 3 0 110 6 3 3 0 010-6z" />
      </Svg>
    )
  }

  export const TickMarkIcon = (props) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={14.936}
        height={12.886}
        {...props}
      >
        <Defs>
          <ClipPath id="prefix__a">
            <Path fill="none" d="M0 0h14.936v12.886H0z" />
          </ClipPath>
        </Defs>
        <G data-name="Component 47 \u2013 1" clipPath="url(#prefix__a)">
          <Path
            data-name="Path 110"
            d="M1 6.966l5.279 4.486L13.936 1"
            fill="none"
            stroke={props.color}
            strokeLinecap="round"
            strokeWidth={2}
          />
        </G>
      </Svg>
    )
  }

  export const ChatIcon = (props) => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={44} height={44} {...props}>
        <G data-name="Group 4723" transform="translate(-46 -303)">
          <Circle
            data-name="Ellipse 3"
            cx={22}
            cy={22}
            r={22}
            transform="translate(46 303)"
            fill="#3885ff"
          />
          <Path
            data-name="Path 19"
            d="M68.009 315c-7.461 0-13.509 4.332-13.509 9.676 0 3.151 2.1 5.95 5.359 7.717a16.942 16.942 0 01-4.623 3.793c4.2-.143 6.787-1.23 8.362-2.362a18.393 18.393 0 004.411.528c7.461 0 13.509-4.332 13.509-9.676S75.469 315 68.009 315z"
            fill="#fff"
          />
        </G>
      </Svg>
    )
  }

  export const VideoCallIcon = (props) => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={44} height={44} {...props}>
        <G data-name="Group 4725" transform="translate(-217 -317)">
          <Circle
            data-name="Ellipse 5"
            cx={22}
            cy={22}
            r={22}
            transform="translate(217 317)"
            fill="#fd6c57"
          />
          <G data-name="Group 12" transform="translate(8 151.5)" fill="#fff">
            <Rect
              data-name="Rectangle 140"
              width={19.048}
              height={15.686}
              rx={3}
              transform="translate(219 180)"
            />
            <Path
              data-name="Path 101"
              d="M238.623 189.68v-3.457l4.84-4.149s1.383-1.1 1.383.691c-.006-.008 0 10.372 0 10.372s-.563 1.511-2.074 0c-.017-.046-4.149-3.457-4.149-3.457z"
            />
          </G>
        </G>
      </Svg>
    )
  }

  export const AudioCallIcon = (props) => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={44} height={44} {...props}>
        <G data-name="Group 4724" transform="translate(-137 -317)">
          <Circle
            data-name="Ellipse 4"
            cx={22}
            cy={22}
            r={22}
            transform="translate(137 317)"
            fill="#fe9654"
          />
          <G data-name="noun_phone call_243797">
            <Path
              data-name="Path 102"
              d="M146.678 336.709a8.819 8.819 0 01-.662-3.73 2.987 2.987 0 01.963-2.046c.632-.6 1.233-1.233 1.865-1.865a1.775 1.775 0 012.677 0l1.5 1.5c.481.481.993.963 1.474 1.474a1.778 1.778 0 010 2.738l-1.835 1.835a.375.375 0 00-.09.481 11.076 11.076 0 001.655 2.677 19.549 19.549 0 004.663 4.242c.391.241.812.421 1.2.632a.351.351 0 00.511-.09c.6-.632 1.233-1.233 1.865-1.865a1.775 1.775 0 012.677 0c.993.993 2.016 1.985 3.008 2.978a1.766 1.766 0 010 2.707c-.572.572-1.173 1.113-1.715 1.715a3.359 3.359 0 01-2.881 1.087 11.143 11.143 0 01-4.6-1.324 25 25 0 01-8.243-6.438 23.176 23.176 0 01-4.032-6.708zm24.517 1.8A12.524 12.524 0 00158.681 326v2.377a10.181 10.181 0 0110.137 10.137zm-6.859 0h2.377a8.05 8.05 0 00-8.032-8.032v2.377a5.649 5.649 0 015.656 5.656z"
              fill="#fff"
            />
          </G>
        </G>
      </Svg>
    )
  }

  export const BookingCalenderIcon = (props) => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={44} height={44} {...props}>
        <G data-name="Group 4726">
          <Path
            data-name="Path 103"
            d="M22 0A22 22 0 110 22 22 22 0 0122 0z"
            fill="#615dd9"
          />
          <Path
            data-name="Path 103"
            d="M16.641 14.114a.773.773 0 01-.774.774.773.773 0 01-.774-.774V11.02a.773.773 0 01.775-.774.773.773 0 01.774.774zm12.377-3.094a.773.773 0 00-.773-.774.773.773 0 00-.774.774v3.094a.773.773 0 00.774.774.773.773 0 00.774-.774zm1.547 13.151a4.641 4.641 0 104.641 4.641 4.646 4.646 0 00-4.641-4.641m0-1.547a6.188 6.188 0 11-6.188 6.188 6.189 6.189 0 016.188-6.188zm-12.377-3.095h-3.094v3.094h3.094zm0 4.641h-3.094v3.094h3.094zm4.642-4.641h-3.094v3.094h3.094zm0 4.641h-3.094v3.094h3.094zm0 4.641h-9.154a.146.146 0 01-.129-.154V17.982h17.018v3.094h1.547v-6.03a1.688 1.688 0 00-1.676-1.7h-.645v.774a1.547 1.547 0 01-3.094 0v-.78h-9.282v.774a1.547 1.547 0 01-3.094 0v-.774h-.645A1.689 1.689 0 0012 15.046v13.611a1.69 1.69 0 001.676 1.7h9.154zm4.641-9.283h-3.094v3.094h3.094zm5.415 8.509h-1.547v-1.546a.774.774 0 00-1.547 0v1.547h-1.547a.774.774 0 000 1.547h1.547v1.547a.774.774 0 001.547 0v-1.547h1.547a.774.774 0 000-1.547z"
            fill="#fff"
          />
        </G>
      </Svg>
    )
  }

  export const CalendarIcon = (props) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24.042}
        {...props}
      >
        <G data-name="Group 412" fill={props.color}>
          <Path
            data-name="Path 104"
            d="M2 24.042h20a2 2 0 002-2v-19a2 2 0 00-2-2h-2.01v2.04a3 3 0 01-6 0v-2.04h-4v2.04a3 3 0 11-6 0v-2.04H2a2.006 2.006 0 00-2 2v19a2.006 2.006 0 002 2zm0-16h20v14H2z"
          />
          <Path
            data-name="Path 105"
            d="M5.988 1v2.084a1 1 0 002 0V1a1 1 0 00-2 0z"
          />
          <Path
            data-name="Path 106"
            d="M15.988 1v2.084a1 1 0 002 0V1a1 1 0 00-2 0z"
          />
          <Path data-name="Rectangle 150" d="M4 10.042h4v4H4z" />
          <Path data-name="Rectangle 151" d="M4 16.042h4v4H4z" />
          <Path data-name="Rectangle 152" d="M10 10.042h4v4h-4z" />
          <Path data-name="Rectangle 153" d="M10 16.042h4v4h-4z" />
          <Path data-name="Rectangle 154" d="M16 10.042h4v4h-4z" />
          <Path data-name="Rectangle 155" d="M16 16.042h4v4h-4z" />
        </G>
      </Svg>
    )
  }

  export const LocationCircleIcon = (props) =>{
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={74} height={74} {...props}>
        <G data-name="Group 530">
          <G
            data-name="Ellipse 28"
            transform="translate(4 4)"
            fill="#fff"
            stroke={props.color}
            strokeWidth={4}
          >
            <Circle cx={33} cy={33} r={33} stroke="none" />
            <Circle cx={33} cy={33} r={35} fill="none" />
          </G>
          <G data-name="Group 432">
            <Path
              data-name="Path 111"
              d="M36.804 58.425C31.88 52.123 22.427 41.832 22.427 33.61a14.768 14.768 0 0114.377-14.771A14.777 14.777 0 0151.227 33.61c0 8.222-9.45 18.513-14.423 24.815zm0-32.2a7.385 7.385 0 11-7.385 7.385 7.418 7.418 0 017.385-7.386z"
              fill={props.color}
              fillRule="evenodd"
            />
          </G>
        </G>
      </Svg>
    )
  }




  export const IndianRupeeSolidIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-5 prefix__w-5"
        viewBox="0 0 20 20"
        fill={props.color}
        {...props}
      >
        <Path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z"
          clipRule="evenodd"
        />
      </Svg>
    )
  }

  export const IndianRupeeIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-6 prefix__w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke={props.color}
        {...props}
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </Svg>
    )
  }


  export const BrifcaseIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-5 prefix__w-5"
        viewBox="0 0 20 20"
        fill={props.color}
        {...props}
      >
        <Path
          fillRule="evenodd"
          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
        <Path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15a24.98 24.98 0 01-8-1.308z" />
      </Svg>
    )
  }




  export const CheckedSolidIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-5 prefix__w-5"
        viewBox="0 0 20 20"
        fill={props.color}
        {...props}
      >
        <Path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </Svg>
    )
  }




  export const ShopingBagSolidIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-5 prefix__w-5"
        viewBox="0 0 20 20"
        fill={props.color}
        {...props}
      >
        <Path
          fillRule="evenodd"
          d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
          clipRule="evenodd"
        />
      </Svg>
    )
  }




  export const CubeIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-6 prefix__w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke={props.color}
        {...props}
        width={32} height={32}
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </Svg>
    )
  }



  export const PlusIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-5 prefix__w-5"
        viewBox="0 0 20 20"
        fill={props.color}
        {...props}
      >
        <Path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
          clipRule="evenodd"
        />
      </Svg>
    )
  }




  export const TrashIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-6 prefix__w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke={props.color}
        {...props}
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </Svg>
    )
  }






  export const EditIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-6 prefix__w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke={props.color}
        {...props}
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </Svg>
    )
  }




  export const TickMarkSolidIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-5 prefix__w-5"
        viewBox="0 0 20 20"
        fill={props.color}
        {...props}
      >
        <Path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </Svg>
    )
  }




  export const CrossMarkSolidIcon = (props) =>{
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__h-5 prefix__w-5"
        viewBox="0 0 20 20"
        fill={props.color}
        {...props}
      >
        <Path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </Svg>
    )
  }



