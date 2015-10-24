<?php

namespace XVEngine\Core\Handler\WhenHandler;

use JsonSerializable;
use XVEngine\Core\Handler\AbstractHandler;


/**
 * Class When
 * @author Krzysztof Bordeux Bednarczyk
 * @package XVEngine\Bundle\CoreBundle\Handler\WhenHandler
 */
class When implements JsonSerializable {

    
    /**
     *
     * @var AbstractHandler
     */
    public $thenHandler = null;

    /**
     *
     * @var AbstractHandler
     */
    public $failHandler = null;

    /**
     *
     * @var CaseExpresion 
     */
    public $caseExpression;


    /**
     * @param callable $callable
     * @param null|Object $obj
     */
    public function __construct(callable $callable, $obj = null) {
        $this->caseExpression = new CaseExpresion();
        if($obj){
            $callable->bindTo($obj);
        }
        $result = $callable($this->caseExpression);
        
        if($result instanceof CaseExpresion){
            $this->caseExpression = $result;
        }
    }


    /**
     * Event is called when case result is positive
     *
     * @author Krzysztof Bednarczyk
     * @param callable $callable
     * @param null|Object $obj
     * @return $this
     */
    public function then(callable $callable, $obj = null) {
        $obj && $callable->bindTo($obj);
        $this->thenHandler = $callable();
        return $this;
    }

    
    /**
     * Event is called when case result is negative
     * 
     * @param callable $callable
     * @param null|Object $obj
     * @return When
     */
    public function fail(callable $callable, $obj = null) {
        $obj && $callable->bindTo($obj);
        $this->failHandler = $callable();
        return $this;
    }


    /**
     * Serialize this case to json
     *
     * @author Krzysztof Bednarczyk
     * @return array
     */
    public function jsonSerialize() {
        return array(
            "when" => $this->caseExpression,
            "then" => $this->thenHandler,
            "fail" => $this->failHandler
        );
    }

}
