# IncidentIQ — An incident response Copilot

IncidentIQ is an AI-powered cybersecurity tool that transforms raw security logs into actionable incident intelligence.

Security analysts often need to manually interpret massive volumes of data. IncidentIQ helps automate this process by analyzing logs, detecting potential threats, mapping activity to MITRE ATT&CK techniques, and generating structured incident response reports.

The goal of this project is to demonstrate how large language models and modern web tooling can be used to assist Security Operations Center (SOC) workflows.

## Key Features

- AI-powered incident explanation
- MITRE ATT&CK technique mapping
- Threat severity classification
- Automated remediation guidance
- Executive-friendly incident summaries
- Interactive cybersecurity dashboard
- Example attack simulations (PowerShell, AWS CloudTrail, brute force)

## Architecture

Logs → Detection Pipeline → LLM Analysis → Incident Report

## Tech Stack

Backend:
- Python
- FastAPI
- LLM integration
- Log detection pipeline

Frontend:
- Next.js
- TailwindCSS
- Interactive cyber dashboard UI

## Use Cases

- Security Operations Center (SOC) incident
- Security log investigation
- Threat intelligence analysis
- AI-assisted incident response
