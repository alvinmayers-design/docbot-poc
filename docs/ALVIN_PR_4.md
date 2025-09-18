# Title: Update GitHub Actions Workflow for Documentation Generation

## WHAT
- Enhanced the GitHub Actions workflow for generating documentation by:
  - Checking out the contributor's branch instead of the read-only merge ref.
  - Modifying dependency installation to exclude audit and funding.
  - Improving the handling of documentation previews and commit logic.

## WHY
- To ensure that the workflow correctly references the contributor's branch, allowing for accurate documentation generation.
- To streamline dependency installation, reducing unnecessary checks.
- To improve the robustness of the preview handling and ensure meaningful output even when no preview is available.

## HOW
- Key files and logic:
  - Updated `.github/workflows/alvin-docs.yml` to:
    - Use `actions/checkout@v4` with parameters to check out the correct branch.
    - Install dependencies with `npm i --no-audit --no-fund`.
    - Enhance the logic for generating and committing documentation.
    - Improve the preview output handling to provide a default message when no preview file is found.
- Environment variables:
  - Introduced `GITHUB_EVENT_PATH` and `GITHUB_REPOSITORY` for better context in the documentation generation step.

## OUTPUTS
- The workflow now:
  - Commits generated documentation back to the contributor's branch if changes are made.
  - Provides a default message for the preview if no preview file exists.
- Acceptance criteria:
  - Verify that documentation is generated and committed correctly.
  - Ensure that the workflow runs successfully without errors.

## CHANGE MAP
| Path                              | Type      | Summary                                                   |
|-----------------------------------|-----------|-----------------------------------------------------------|
| .github/workflows/alvin-docs.yml  | Workflow  | Updated to check out contributor branch and improve docs generation. |

## RISK & REVIEW
- Correctness risks:
  - Ensure that the checkout step correctly identifies and checks out the contributor's branch.
  - Validate that documentation generation logic functions as intended.
- Security/performance considerations:
  - Review the implications of using `persist-credentials: true` in the checkout step.
- Areas requiring human review:
  - Review the generated documentation for accuracy and completeness.
  - Confirm that the preview output is meaningful and correctly formatted.