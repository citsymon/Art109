const fragmentShaderB = () => {
  return `
    varying float Bx;
    varying float By;
    varying float Bz;
    varying vec3 vUv;

    uniform float u_time;

    void main() {
      gl_FragColor = vec4((32.0 - abs(Bx)) / 32.0, (32.0 - abs(By)) / 32.0, (abs(Bx + By) / 2.0) / 32.0, 1.0);
    }
  `;
};

export { fragmentShaderB };