import sys
import json
from pathlib import Path


class ConfigParser:
    def __init__(self, config_filepath: str = "../config.json") -> None:
        self.config = None
        
        try:
            Path(config_filepath).resolve()
            with open(config_filepath) as config_filehandler:
                self.config = json.load(config_filehandler)
        except (OSError, RuntimeError):
            sys.stderr.write("[-] Cannot read config file, invalid filepath provided")
        
    def get(self, key: str):
        return self.config.get(key)
    
    def __del__(self):
        self.config = None