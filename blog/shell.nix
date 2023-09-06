with import <nixpkgs> {};

stdenv.mkDerivation {
  name = "node";
  buildInputs = [
    nodejs
    autoreconfHook
    nasm
    pkg-config
    libpng.dev
  ];
  shellHook = ''
    export PATH="$PWD/node_modules/.bin:$PATH"
  '';
}