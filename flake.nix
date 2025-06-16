{
  description = "My Awesome Desktop Shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    ags,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    packages.${system} = {
      default = ags.lib.bundle {
        inherit pkgs;
        src = ./.;
        name = "vo1ded-panel";
        entry = "app.ts";

        extraPackages = [
          ags.packages.${system}.tray
          ags.packages.${system}.hyprland
          ags.packages.${system}.wireplumber
        ];
      };
    };

    devShells.${system} = {
      default = pkgs.mkShell {
        buildInputs = [
          # includes astal3 astal4 astal-io by default
          (ags.packages.${system}.default.override {
            extraPackages = [
              ags.packages.${system}.tray
              ags.packages.${system}.hyprland
              ags.packages.${system}.wireplumber
              ags.packages.${system}.astal3
              # cherry pick packages
            ];
          })
        ];
      };
    };
  };
}
