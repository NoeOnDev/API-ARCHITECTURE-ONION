/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    // Architecture rules hexagonal
    {
      name: "no-domain-depending-on-outer-layers",
      comment:
        "The domain layer must not depend on application or infrastructure layers",
      severity: "error",
      from: {
        path: "^.*/domain/.*",
      },
      to: {
        path: "^.*/(application|infrastructure)/.*",
      },
    },
    {
      name: "no-application-depending-on-infrastructure",
      comment:
        "The application layer must not depend on the infrastructure layer",
      severity: "error",
      from: {
        path: "^.*/application/.*",
      },
      to: {
        path: "^.*/infrastructure/.*",
      },
    },
    // Detect circular dependencies
    {
      name: "no-circular",
      severity: "warn",
      comment:
        "This dependency is part of a circular relationship. Consider revising your design.",
      from: {},
      to: {
        circular: true,
      },
    },
    // Detect orphaned modules
    {
      name: "no-orphans",
      comment:
        "This is an orphan module - likely unused. Consider removing it.",
      severity: "warn",
      from: {
        orphan: true,
        pathNot: [
          "(^|/)[.][^/]+[.](?:js|cjs|mjs|ts|cts|mts|json)$",
          "[.]d[.]ts$",
          "(^|/)tsconfig[.]json$",
        ],
      },
      to: {},
    },
    // Prevent unresolvable modules
    {
      name: "not-to-unresolvable",
      comment:
        "This module depends on a module that cannot be found. Resolve or remove it.",
      severity: "error",
      from: {},
      to: {
        couldNotResolve: true,
      },
    },
  ],
  options: {
    doNotFollow: {
      path: ["node_modules"],
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: "tsconfig.json",
    },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
      mainFields: ["main", "types", "typings"],
    },
    reporterOptions: {
      dot: {
        collapsePattern: "node_modules/(?:@[^/]+/[^/]+|[^/]+)",
      },
    },
  },
};
