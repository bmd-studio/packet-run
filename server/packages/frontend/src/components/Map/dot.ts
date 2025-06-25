
const size = 32;

export default function generateDot() {
    // This implements `StyleImageInterface`
    // to draw a pulsing dot icon on the map.
    return {
        width: size,
        height: size,
        data: new Uint8ClampedArray(size * size * 4),
        context: null as null | CanvasRenderingContext2D,

        // When the layer is added to the map,
        // get the rendering context for the map canvas.
        onAdd: function() {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },

        // Call once before every frame where the icon will be used.
        render: function() {
            const radius = (size / 2);
            const context = this.context;
            //
            if (!context) {
                return;
            }
            //
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
            context.fillStyle = '#FF781F';
            context.fill();
            context.stroke();

            // Update image data
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height
            ).data as Uint8ClampedArray<ArrayBuffer>;
            return true;
        }
    };
}
