import vision from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision;

export async function CreateFaceLandmarker(signal) {
    try {
        const resolverPromise = FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm", { signal });
        const resolver = await resolverPromise;

        const options = {
            baseOptions: {
                modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                delegate: "GPU"
            },
            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1
        };

        const markerPromise = FaceLandmarker.createFromOptions(resolver, options, { signal });
        const marker = await markerPromise;

        return marker;
    } catch (err){
        throw new Error("02");
    }
}