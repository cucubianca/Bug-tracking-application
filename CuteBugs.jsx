import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../index.css";

// Cache for processed images (transparent versions)
const processedCache = {};

const removeBackground = (src) => {
    if (processedCache[src]) return Promise.resolve(processedCache[src]);

    return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = "anonymous"; // Ensure CORS if needed
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Aggressive white removal to fulfill "same color as background" request
            // Since it's a gradient, setting white to alpha=0 is the only way to match.
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // Catch any near-white pixels (threshold 230)
                if (r > 230 && g > 230 && b > 230) {
                    data[i + 3] = 0; // Transparent
                }
            }

            ctx.putImageData(imageData, 0, 0);
            const result = canvas.toDataURL();
            processedCache[src] = result;
            resolve(result);
        };
    });
};

const CuteBugs = () => {
    const [bugs, setBugs] = useState([]);
    const [processedImages, setProcessedImages] = useState({});
    const location = useLocation();

    useEffect(() => {
        const species = ["ladybug", "spider"];
        const isMainPage = location.pathname === "/";

        // Pre-process images
        species.forEach(type => {
            const src = `/images/${type}.png`;
            removeBackground(src).then(dataUrl => {
                setProcessedImages(prev => ({ ...prev, [type]: dataUrl }));
            });
        });

        const newBugs = Array.from({ length: isMainPage ? 8 : 4 }).map((_, i) => {
            const type = species[Math.floor(Math.random() * species.length)];
            return {
                id: i + location.pathname + Math.random(),
                left: Math.random() * 95 + "%",
                animationDuration: Math.random() * 15 + 15 + "s",
                delay: Math.random() * 5 + "s",
                type,
                size: (Math.random() * 20 + 60 + "px"),
            };
        });
        setBugs(newBugs);
    }, [location.pathname]);

    return (
        <div className="cute-bugs-container">
            {bugs.map((bug) => (
                <div
                    key={bug.id}
                    className="cute-bug"
                    style={{
                        left: bug.left,
                        animationDuration: bug.animationDuration,
                        animationDelay: bug.delay,
                    }}
                >
                    {processedImages[bug.type] && (
                        <img
                            src={processedImages[bug.type]}
                            alt={bug.type}
                            style={{
                                width: bug.size,
                                height: "auto",
                                mixBlendMode: "multiply", // Ensures any jagged edges blend into the app's rose/orange background
                                opacity: 0.85
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default CuteBugs;
