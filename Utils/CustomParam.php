<?php

namespace XVEngine\Core\Utils;
use XVEngine\Core\Component\AbstractComponent;


/**
 * Class CustomParam
 * @author Krzysztof Bordeux Bednarczyk
 * @package Tattool\Bundle\XVBundle\Classes\Response
 */
class CustomParam {

    /**
     * @var string
     */
    private $path;


    /**
     * @param $path
     */
    public function __construct($path) {
        $this->path = $path;
    }


    /**
     * Create new Object with address to data
     * @author Krzysztof Bednarczyk
     * @param string|AbstractComponent $path Protocol URI to element, ex. selector://.test , service://ui.progress
     * @return CustomParam
     */
    public static function get($path){
        if($path instanceof AbstractComponent){
            $path = $path->getID();
        }
        return new self($path);
    }


    /**
     * If you need call get method, you can use this.
     * @author Krzysztof Bednarczyk
     * @return array
     */
    public function _get(){
        return $this->__call("get", func_get_args());
    }


    /**
     * Generate array with address to data
     * @author Krzysztof Bednarczyk
     * @param string $functionName
     * @param array $args
     * @return array
     */
    function __call($functionName, $args = array()) {
        return array(
            "__custom" => "custom",
            "path" => $this->path,
            "method" => $functionName,
            "arguments" => $args
        );
    }

}
