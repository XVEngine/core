<?php

namespace XVEngine\Core\Composer;

use Composer\Package\CompletePackage;
use Composer\Repository\ComposerRepository;
use Composer\Script\Event;

class Script
{

    const TYPE_NAME = "xvengine-bundle";


    /**
     * @author Krzysztof Bednarczyk
     * @param Event $event
     */
    public static function watch(Event $event){
        $composer = $event->getComposer();



        $repos = $composer->getRepositoryManager()->getLocalRepository();
        $installationManager = $composer->getInstallationManager();


        $packages = [];
        /**
         * @var $package CompletePackage
         */
        foreach($repos->getPackages() as $package){

            if($package->getType() !== self::TYPE_NAME){
                $keywords = $package->getKeywords();
                if(!$keywords){
                    continue;
                }

                $hasKeyword = false;
                foreach($keywords as $keyword){
                    if($keyword == self::TYPE_NAME){
                        $hasKeyword = true;
                        break;
                    }
                }

                if(!$hasKeyword){
                    continue;
                }
            }



            var_dump($package->getKeywords());

            $installPath = $installationManager->getInstallPath($package);

            $configPath = $installPath.DIRECTORY_SEPARATOR."xvengine.json";

            $packageConfig = [];
            if(file_exists($configPath)){
                $packageConfig = json_encode(file_get_contents($configPath));
            }


            $packages[] = [
                "package" => $installPath,
                "xvEngine" => self::getDefaultConfig($packageConfig)
            ];
        }


        $xvDir = realpath($event->getComposer()->getConfig()->get('archive-dir')).DIRECTORY_SEPARATOR.'.xvEngine';

        if(!file_exists($xvDir)){
            mkdir($xvDir);
        }
		
		/**
		* Hide directory in windows
		*/
		if (strncasecmp(PHP_OS, 'WIN', 3) == 0) {
			exec('attrib +H ' . escapeshellarg($xvDir), $res);
		}

        file_put_contents($xvDir.DIRECTORY_SEPARATOR.".packages", json_encode($packages, JSON_PRETTY_PRINT));
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param array $config
     * @return array
     */
    public static function getDefaultConfig(array $config = []){
        return array_replace_recursive([

        ], $config);
    }
}