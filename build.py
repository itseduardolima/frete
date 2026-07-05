#!/usr/bin/env python3
"""Gera index.html, script.js, robots.txt e sitemap.xml a partir dos
templates (*.template.*) e das variáveis definidas em .env.

Uso: edite .env e rode `python3 build.py`.
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent


def load_env(path):
    env = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        key, _, value = line.partition("=")
        env[key.strip()] = value.strip()
    return env


def render(template_path, output_path, env):
    text = template_path.read_text(encoding="utf-8")

    def replace(match):
        key = match.group(1)
        if key not in env:
            raise KeyError(f"Variável {key} usada em {template_path.name} não existe em .env")
        return env[key]

    text = re.sub(r"\{\{(\w+)\}\}", replace, text)
    output_path.write_text(text, encoding="utf-8")
    print(f"{template_path.name} -> {output_path.name}")


def main():
    env = load_env(ROOT / ".env")
    env["SITE_URL_NO_SLASH"] = env["SITE_URL"].rstrip("/")
    env["CITY_UPPER"] = env["CITY"].upper()
    env["CITY_LOWER"] = env["CITY"].lower()

    targets = [
        ("index.template.html", "index.html"),
        ("script.template.js", "script.js"),
        ("robots.template.txt", "robots.txt"),
        ("sitemap.template.xml", "sitemap.xml"),
    ]
    for template_name, output_name in targets:
        render(ROOT / template_name, ROOT / output_name, env)


if __name__ == "__main__":
    main()
