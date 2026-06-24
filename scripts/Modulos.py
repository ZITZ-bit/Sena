import os
import subprocess

def run(cmd, cwd=None):
    print(f"\n🚀 Ejecutando: {cmd}\n")
    subprocess.run(cmd, shell=True, cwd=cwd)

def main():
    module_name = input("📦 Nombre del módulo: ").strip().lower()

    if not module_name:
        print("❌ El nombre no puede estar vacío")
        return

    base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

    module_path = os.path.join(base_path, "apps", "api", "src", module_name)

    os.makedirs(module_path, exist_ok=True)

    print(f"\n📁 Creando módulo en: {module_path}")

    run(f"nest g mo {module_name} --no-spec --flat", cwd=module_path)
    run(f"nest g co {module_name} --no-spec --flat", cwd=module_path)
    run(f"nest g s {module_name} --no-spec --flat", cwd=module_path)

    print("\n✅ Módulo creado correctamente sin duplicación!")

if __name__ == "__main__":
    main()