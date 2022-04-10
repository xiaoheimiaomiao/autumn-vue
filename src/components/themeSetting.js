const shapeType = {
    default: "default",
    circle: "circle",
    onlyIcon: "onlyIcon"
};

const button = {
    shape: shapeType.default,
    getShape: function() {
        if (this.shape === "default") {
            return null;
        }
        if (this.shape === "circle" || this.shape === "onlyIcon") {
            return "circle";
        }
    },
    getTextShow: function () {
        if (this.shape === "onlyIcon") {
            return false;
        }
        return true;
    }
};



export default {button};