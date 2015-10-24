<?php

namespace XVEngine\Core\Handler;
use XVEngine\Core\Handler\WhenHandler\When;


/**
 * $caseHandler = new WhenHandler();
 * <code>
 * $caseHandler->when(function($case){
 *      $case.isEqual($case.getParam("loremIpsum", "test"), "5325");
 *      $case.isEqual($case.getParam("loremIpsum", "test"), "5325");
 * 
 * }).then(function(){
 *      $handler new Handler();
 *      return $handler;
 * }).fail(function(){
 *      $handler new Handler();
 *      return $handler;
 * });
 * </code>
 */
class WhenHandler extends AbstractHandler {

    /**
     * 
     * @var string
     */
    public $name = "when";

    /**
     *
     * @var When[] 
     */
    public $when = [];

    /**
     * 
     * @param string $serviceName
     */
    public function __construct() {
    }


    /**
     * When case
     * @author Krzysztof Bednarczyk
     * @param callable $function
     * @param null|Object $obj
     * @return When
     */
    public function when(callable $function, $obj = null) {
        $when = new When($function, $obj);
        $this->when[] = $when;
        return $when;
    }


    /**
     *
     * @author Krzysztof Bednarczyk
     * @return mixed[]
     */
    public function jsonSerialize() {
        return array(
            "name" => $this->name,
            "when" => $this->when
        );
    }

}
