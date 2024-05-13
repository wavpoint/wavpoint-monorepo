import { forwardRef } from "react";
import { G, Polygon, Svg } from "react-native-svg";

type EthLogoProps = React.ComponentPropsWithoutRef<typeof Svg>;

export const EthLogo = forwardRef<React.ElementRef<typeof Svg>, EthLogoProps>(
	(props, ref) => {
		return (
			<Svg
				ref={ref}
				width="100%"
				height="100%"
				shape-rendering="geometricPrecision"
				text-rendering="geometricPrecision"
				image-rendering="optimizeQuality"
				fill-rule="evenodd"
				clip-rule="evenodd"
				viewBox="0 0 784.37 1277.39"
				{...props}
			>
				<G id="Layer_x0020_1">
					<G id="_1421394342400">
						<G>
							<Polygon
								fill="#343434"
								fill-rule="nonzero"
								points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
							/>
							<Polygon
								fill="#8C8C8C"
								fill-rule="nonzero"
								points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
							/>
							<Polygon
								fill="#3C3C3B"
								fill-rule="nonzero"
								points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
							/>
							<Polygon
								fill="#8C8C8C"
								fill-rule="nonzero"
								points="392.07,1277.38 392.07,956.52 -0,724.89 "
							/>
							<Polygon
								fill="#141414"
								fill-rule="nonzero"
								points="392.07,882.29 784.13,650.54 392.07,472.33 "
							/>
							<Polygon
								fill="#393939"
								fill-rule="nonzero"
								points="0,650.54 392.07,882.29 392.07,472.33 "
							/>
						</G>
					</G>
				</G>
			</Svg>
		);
	},
);
