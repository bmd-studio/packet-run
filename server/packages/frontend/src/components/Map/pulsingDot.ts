import { Map } from 'mapbox-gl';

const size = 128;

export default function generatePulsingDot(map: Map) {
    // This implements `StyleImageInterface`
    // to draw a pulsing dot icon on the map.
    return {
        width: size,
        height: size,
        data: new Uint8ClampedArray(size * size * 4),
        context: null as null | CanvasRenderingContext2D,

        // When the layer is added to the map,
        // get the rendering context for the map canvas.
        onAdd: function () {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },

        // Call once before every frame where the icon will be used.
        render: function () {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;

            const radius = (size / 2) * 0.3;
            const outerRadius = (size / 2) * 0.7 * t + radius;
            const context = this.context;

            if (!context) {
                return;
            }

            // Clear the canvas
            context.clearRect(0, 0, this.width, this.height);

            // Draw the outer circle with reduced opacity
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2
            );
            context.fillStyle = `rgba(200, 200, 0, ${0.5 * (1 - t)})`;
            context.fill();

            // Draw the inner circle with simplified styling
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(240, 234, 0, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 + 2;
            context.fill();
            context.stroke();

            // Update image data
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height
            ).data as Uint8ClampedArray<ArrayBuffer>;

            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => map.triggerRepaint());

            return true;
        }
    };
}