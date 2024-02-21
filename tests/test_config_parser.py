import unittest

from util.config_parser import ConfigParser


class TestConfigParser(unittest.TestCase):
    # Fix ?
    def test_default_file_access(self):
        config_parser = ConfigParser()
        self.assertIsNotNone(config_parser.config)
    
    def test_custom_valid_file_access(self):
        config_parser = ConfigParser(r"D:\Projects\BrainCards\config.json")
        self.assertIsNotNone(config_parser.config)
    
    def test_custom_invalid_file_access(self):
        config_parser = ConfigParser(r"D:\tmp\hello.txt")
        self.assertIsNone(config_parser.config)

    def test_custom_null_file_access(self):
        config_parser = ConfigParser()
        self.assertIsNotNone(None)


if __name__ == '__main__':
    unittest.main()
