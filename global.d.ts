declare module "*.css";
declare module "*.scss";

// Specific fallbacks for packages that import deep CSS paths
declare module "@xyflow/react/*";
declare module "@xyflow/react/dist/style.css";

export {};
