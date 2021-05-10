<?php

namespace Tests\InvoiceGenerator;

use App\InvoiceGenerator\FileOperation;
use Exception;
use PHPUnit\Framework\TestCase;

class FileOperationTest extends TestCase
{
    private $filenames = [];

    protected function tearDown(): void
    {
        foreach ($this->filenames as $key => $filename) {
            if (is_file($filename))
                unlink($filename);
            unset($this->filenames[$key]);
        }

        parent::tearDown();
    }

    protected function getFilename($dir = null)
    {
        return ($dir ?: sys_get_temp_dir())
            . DIRECTORY_SEPARATOR
            . uniqid('test_')
            . '.txt';
    }

    public function testLoadFile()
    {
        $fileOperation = new FileOperation();
        $filename = $this->getFilename();
        $contents = 'This is ' . $filename;

        $this->assertFileDoesNotExist($filename);
        $this->assertNotFalse(file_put_contents($filename, $contents));
        $this->assertFileExists($filename);
        $this->filenames[] = $filename;
        $this->assertEquals($contents, $fileOperation->loadFile($filename));
    }

    public function testLoadFile_FileDoesNotExist()
    {
        $fileOperation = new FileOperation();
        $filename = $this->getFilename();

        $this->assertFileDoesNotExist($filename);
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('File does not exist');
        $fileOperation->loadFile($filename);
    }

    public function testLoadFile_FailedToLoadFile()
    {
        $fileOperation = new FileOperation();
        $filename = $this->getFilename();
        $contents = '';

        $this->assertFileDoesNotExist($filename);
        $this->assertNotFalse(file_put_contents($filename, $contents));
        $this->assertFileExists($filename);
        $this->filenames[] = $filename;
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Failed to load file');
        $fileOperation->loadFile($filename);
    }

    public function testSaveFile()
    {
        $fileOperation = new FileOperation();
        $filename = $this->getFilename();
        $contents = 'This is ' . $filename;

        $this->assertFileDoesNotExist($filename);
        $fileOperation->saveFile($filename, $contents);
        $this->assertFileExists($filename);
        $this->filenames[] = $filename;
        $this->assertEquals($contents, file_get_contents($filename));
    }

    public function testSaveFile_FileAlreadyExists()
    {
        $fileOperation = new FileOperation();
        $filename = $this->getFilename();
        $contents = 'This is ' . $filename;

        $this->assertFileDoesNotExist($filename);
        $this->assertNotFalse(file_put_contents($filename, $contents));
        $this->assertFileExists($filename);
        $this->filenames[] = $filename;
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('File already exists');
        $fileOperation->saveFile($filename, $contents);
    }

    public function testSaveFile_FailedToSaveFile()
    {
        $fileOperation = new FileOperation();
        $filename = $this->getFilename('thisDoesNotExist');
        $contents = 'This is ' . $filename;

        $this->assertFileDoesNotExist($filename);
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Failed to save file');
        $fileOperation->saveFile($filename, $contents);
    }
}
