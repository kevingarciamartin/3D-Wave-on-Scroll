export const vertex = `
  uniform float uAmplitude;
  uniform float uWaveLength;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 newPosition = position;
    float wave = uAmplitude * sin(position.x * uWaveLength + uTime);
    wave += uAmplitude * sin(0.8 * position.x * uWaveLength + uTime * 0.7);
    wave += uAmplitude * sin(0.5 * position.x * uWaveLength + uTime * 0.5);
    wave += uAmplitude * sin(2.1 * position.x * uWaveLength + uTime * 0.1);
    wave += uAmplitude * sin(0.3 * position.y * uWaveLength + uTime * 0.9);
    wave += uAmplitude * sin(1.3 * position.y * uWaveLength + uTime * 0.3);
    newPosition.z += wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

export const fragment = `
  uniform sampler2D uTexture;
  uniform vec2 uvUvScale;
  varying vec2 vUv;

  void main() {
    vec2 uv = (vUv - 0.5) * uvUvScale + 0.5;
    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`;
